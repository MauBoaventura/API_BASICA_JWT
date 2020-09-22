exports.up = function (knex, Promise) {
    return knex.schema.createTable('users', function (table) {
        table.increments();
        table.string('cpf').notNullable()//.unique();
        table.binary('avatar');
        table.string('name').notNullable();
        table.string('lastname').notNullable();
        table.string('email').notNullable()//.unique();
        table.datetime('age').notNullable();
        table.string('password').notNullable();
        table.timestamp('createdAt').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
        // table.timestamp('updatedAt').defaultTo(knex.raw('NULL ON UPDATE CURRENT_TIMESTAMP'))
        table.datetime('deletedAt');
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('users')
};