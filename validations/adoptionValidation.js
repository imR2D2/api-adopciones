const {check, validationResult} = require('express-validator');

const generateAdoptionValidators = () =>[
    check('user_id').notEmpty().isLength({max:50}).isNumeric().withMessage("Invalid user Id"),
    check('pet_id').notEmpty().isLength({max:50}).isNumeric().withMessage("Invalid pet Id"),
    check('date').notEmpty().isLength({max:150}).isDate().withMessage("Invalid date"),
]

const updateAdoptionValidators = () =>[
    check('id').notEmpty().isNumeric().withMessage("Invalid ID"),
    check('user_id').isLength({max:50}).isNumeric().withMessage("Invalid user Id"),
    check('pet_id').isLength({max:50}).isNumeric().withMessage("Invalid pet Id"),
    check('date').isLength({max:150}).isDate().withMessage("Invalid date"),
]

const generateIdValidators = () =>[
    check('id').notEmpty().isNumeric().withMessage("Invalid ID")
]

const reporter = (req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(404).json({
            "success" : false,
            "code" : 404,
            "message" : errors,
            "data" : []
        });
    }
    next();
}

module.exports = {
    add: [
        generateAdoptionValidators(),
        reporter
    ],
    id: [
        generateIdValidators(),
        reporter
    ],
    update: [
        updateAdoptionValidators(),
        reporter
    ]
}