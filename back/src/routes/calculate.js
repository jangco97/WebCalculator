const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Calculate = require('../models/Calculate');


router.post('/add', auth, async (req, res, next) => {
  try {
    const calculate = new Calculate(req.body);
    calculate.writer = req.user._id;
    calculate.firstinput = req.body.firstinput;
    calculate.secondinput = req.body.secondinput;
    calculate.operator = req.body.operator;
    calculate.result = Number(req.body.firstinput) + Number(req.body.secondinput);
    await calculate.save();
    return res.status(200).json({ result: calculate.result });

  } catch (error) {
    next(error);
  }
});
router.post('/substract', auth, async (req, res, next) => {
  try {
    const calculate = new Calculate(req.body);
    calculate.writer = req.user._id;
    calculate.firstinput = req.body.firstinput;
    calculate.secondinput = req.body.secondinput;
    calculate.operator = req.body.operator;
    calculate.result = Number(req.body.firstinput) - Number(req.body.secondinput);
    await calculate.save();
    return res.status(200).json({ result: calculate.result });
    
  } catch (error) {
    next(error);
  }
});

router.post('/divide', auth, async (req, res, next) => {
    if(Number(req.body.secondinput) === 0 ){
        return res.status(400).send('0으로 나눌 수 없습니다.');
    }
    try {
      const calculate = new Calculate(req.body);
      calculate.writer = req.user._id;
      calculate.firstinput = req.body.firstinput;
      calculate.secondinput = req.body.secondinput;
      calculate.operator = req.body.operator;
      calculate.result = Number(req.body.firstinput)/Number(req.body.secondinput);
      await calculate.save();
      return res.status(200).json({ result: calculate.result });
      
    } catch (error) {
      next(error);
    }
  });

  router.post('/multiply', auth, async (req, res, next) => {
    try {
      const calculate = new Calculate(req.body);
      calculate.writer = req.user._id;
      calculate.firstinput = req.body.firstinput;
      calculate.secondinput = req.body.secondinput;
      calculate.operator = req.body.operator;
      calculate.result = Number(req.body.firstinput)*Number(req.body.secondinput);
      await calculate.save();
      return res.status(200).json({ result: calculate.result });
      
    } catch (error) {
      next(error);
    }
  });

router.get('/:id', async (req, res, next) => {
  let userId = req.params.id;

  try {
    const calculate = await Calculate.find({ writer: userId })

    return res.status(200).send(calculate);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', auth, async (req, res, next) => {
  try {
    const userId = req.params.id;

    // 1. 상품과 관련된 모든 댓글을 찾습니다.
    const calculate = await Calculate.find({ userId });
    console.log(calculate, '삭제완료');
    // 2. 찾은 댓글들을 삭제합니다.
    await Calculate.deleteMany({ userId });

    if (!calculate) {
      return res.status(404).json({ error: 'calculate not found' });
    }

    return res.status(200).json({ message: 'calculate history deleted successfully' });
  } catch (error) {
    next(error);
  }
});


module.exports = router;

