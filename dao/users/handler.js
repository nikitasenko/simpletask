'use strict';

const {
    users,
} = require('./../index');

class UsersDao {

    create(insertObject) {
        return users.create(insertObject);
    }

    getByName(name) {
        return users.findOne({where: {firstName: name}})
            .then(result => {
                if (result) {
                    return result
                }
            });
    }

    updatePdfById(id, pdf) {
        return users.update(
            {pdf: pdf},
            {where: {id: id}},
        );
    }
}

module.exports = UsersDao;
