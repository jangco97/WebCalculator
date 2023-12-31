const express = require('express');
const User = require('../models/User');
const router = express.Router();
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const Calculate = require('../models/Calculate');
const Engineering = require('../models/Engineering');
router.post('/register', async (req, res, next) => {
  try {
    const user = new User(req.body);
    await user.save();
    return res.sendStatus(200);
  } catch (error) {
    next(error); //에러처리기로 전달
  }
});
router.get('/auth', auth, async (req, res, next) => {
  return res.json({
    id: req.user._id,
    email: req.user.email,
    name: req.user.name,
    history: req.user.history,
  });
});
router.post('/login', async (req, res, next) => {
  try {
    //존재하는 유저인지 체크
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send('인증실패 이메일을 찾을 수 없습니다.');
    }

    //비밀번호가 올바른지 체크
    const isMatch = await user.comparePassword(req.body.password);
    if (!isMatch) {
      return res.status(400).send('비밀번호가 잘못되었습니다.');
    }

    //토큰 생성
    const payload = {
      userId: user._id.toHexString(),
    };
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.json({ user, accessToken }); //유저정보와 accessToken 클라에게 보내기
  } catch (error) {
    next(error); //에러처리기로 전달
  }
});
router.post('/logout', auth, async (req, res, next) => {
  try {
    return res.sendStatus(200);
  } catch (error) {
    next(error); //에러처리기로 전달
  }
});
// router.post('/history', auth, async (req, res, next) => {
//     try {
//       //유저 컬렉션에서 해당 유저 정보 가져오기
//       const userInfo = await User.findOne({ _id: req.user._id });
  
//       //가져온 정보에서 카트에 넣을 상품이 이미 들어있는지 확인하기
//       let duplicate = false;
//       userInfo.history.forEach(item => {
//         if (item.id === req.body.calculateId) {
//           duplicate = true;
//         }
//       });
//       //상품이 있음
//       if (duplicate) {
//         const user = await User.findOneAndUpdate(
//           { _id: req.user._id, 'history.id': req.body.calculateId },
//           { $inc: { 'cart.$.quantity': 1 } },
//           { new: true }
//         );
//         return res.status(201).send(user.cart);
//       }
//       //상품이 없는 경우
//       else {
//         const user = await User.findOneAndUpdate(
//           { _id: req.user._id },
//           {
//             $push: {
//               cart: {
//                 id: req.body.productId,
//                 quantity: 1,
//                 date: Date.now(),
//               },
//             },
//           },
//           { new: true }
//         );
//         return res.status(201).send(user.cart);
//       }
//     } catch (error) {
//       next(error); //에러처리기로 전달
//     }
//   });
//   router.delete('/cart', auth, async (req, res, next) => {
//     try {
//       //cart 안에 지우려고 한 상품을 지우기
//       const userInfo = await User.findOneAndUpdate(
//         { _id: req.user._id },
//         { $pull: { cart: { id: req.query.productId } } },
//         { new: true }
//       );
//       const cart = userInfo.cart;
//       const array = cart.map(item => {
//         return item.id;
//       });
  
//       const productInfo = await Product.find({ _id: { $in: array } }).populate('writer');
//       return res.json({
//         productInfo,
//         cart,
//       });
//     } catch (error) {
//       next(error); //에러처리기로 전달
//     }
//   });
  module.exports = router;
  