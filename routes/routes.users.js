const {Router} = require('express');
const {check} = require('express-validator');
const {validateAttributes} = require('../middlewares/validateAttributes');
const {isValidRol, 
       existsEmail,
       existsUserById} = require('../helpers/db-validators');
const {getUsers, 
       getUserById,
       createUser,
       updateUserComplete,
       deleteUser,
       updateUser } = require('../controllers/controllers.users');
const router = Router();

router.get('/', getUsers);
router.get('/', getUserById);
router.post('/', [
       check('name', 'name is require').notEmpty(),
       check('email', 'Email is not allowed').isEmail(),
       check('email').custom(existsEmail),
       check('password', 'Password is require').isLength({min: 8}),
       check('rol').custom(isValidRol),
       //check('rol', 'Rol is not allowed').isIn(['ADMIN_ROL', 'USER_ROL']),
       validateAttributes
], createUser);
router.put('/:id', [
       check('id','Is not a valid ID').isMongoId(),
       check('id').custom(existsUserById),
       check('rol').custom(isValidRol),
       validateAttributes
], updateUser);
router.delete('/:id', [
       check('id','Is not a valid ID').isMongoId(),
       check('id').custom(existsUserById),
       validateAttributes
],deleteUser);
router.patch('/', updateUserComplete);

module.exports = router;