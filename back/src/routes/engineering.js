const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Engineering = require('../models/Engineering');


router.post('/cos', auth, async (req, res, next) => {
  try {
    const engineering = new Engineering(req.body);
    engineering.writer = req.user._id;
    engineering.firstinput = req.body.firstinput;
    engineering.operator = req.body.operator;
    engineering.result = Math.cos(Number(req.body.firstinput));
    await engineering.save();
    return res.status(200).json({ result: engineering.result });

  } catch (error) {
    next(error);
  }
});
router.post('/sin', auth, async (req, res, next) => {
  try {
    const engineering = new Engineering(req.body);
    engineering.writer = req.user._id;
    engineering.firstinput = req.body.firstinput;
    engineering.operator = req.body.operator;
    engineering.result = Math.sin(Number(req.body.firstinput));
    await engineering.save();
    return res.status(200).json({ result: engineering.result });
    
  } catch (error) {
    next(error);
  }
});

router.post('/tan', auth, async (req, res, next) => {
    try {
      const engineering = new Engineering(req.body);
      engineering.writer = req.user._id;
      engineering.firstinput = req.body.firstinput;
      engineering.operator = req.body.operator;
      engineering.result = Math.tan(Number(req.body.firstinput));
      await engineering.save();
      return res.status(200).json({ result: engineering.result });
      
    } catch (error) {
      next(error);
    }
  });

  router.post('/log', auth, async (req, res, next) => {
    try {
      const engineering = new Engineering(req.body);
      engineering.writer = req.user._id;
      engineering.firstinput = req.body.firstinput;
      engineering.operator = req.body.operator;
      engineering.result = Math.log(Number(req.body.firstinput));
      await engineering.save();
      return res.status(200).json({ result: engineering.result });
      
    } catch (error) {
      next(error);
    }
  });
  router.post('/sqrt', auth, async (req, res, next) => {
    try {
      const engineering = new Engineering(req.body);
      engineering.writer = req.user._id;
      engineering.firstinput = req.body.firstinput;
      engineering.operator = req.body.operator;
      engineering.result = Math.sqrt(Number(req.body.firstinput));
      await engineering.save();
      return res.status(200).json({ result: engineering.result });
      
    } catch (error) {
      next(error);
    }
  });
  router.post('/pow', auth, async (req, res, next) => {
    try {
      const engineering = new Engineering(req.body);
      engineering.writer = req.user._id;
      engineering.firstinput = req.body.firstinput;
      engineering.operator = req.body.operator;
      engineering.result = Math.pow(Number(req.body.firstinput));
      await engineering.save();
      return res.status(200).json({ result: engineering.result });
      
    } catch (error) {
      next(error);
    }
  });
  router.post('/exp', auth, async (req, res, next) => {
    try {
      const engineering = new Engineering(req.body);
      engineering.writer = req.user._id;
      engineering.firstinput = req.body.firstinput;
      engineering.operator = req.body.operator;
      engineering.result = Math.exp(Number(req.body.firstinput));
      await engineering.save();
      return res.status(200).json({ result: engineering.result });
      
    } catch (error) {
      next(error);
    }
  });
router.get('/:id', async (req, res, next) => {
  let userId = req.params.id;

  try {
    const engineering = await Engineering.find({ writer: userId })

    return res.status(200).send(engineering);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', auth, async (req, res, next) => {
  try {
    const userId = req.params.id;

    // 1. 상품과 관련된 모든 댓글을 찾습니다.
    const engineering = await Engineering.find({ userId });
    console.log(engineering, '삭제완료');
    // 2. 찾은 댓글들을 삭제합니다.
    await Engineering.deleteMany({ userId });

    if (!engineering) {
      return res.status(404).json({ error: 'calculate not found' });
    }

    return res.status(200).json({ message: 'calculate history deleted successfully' });
  } catch (error) {
    next(error);
  }
});


module.exports = router;

