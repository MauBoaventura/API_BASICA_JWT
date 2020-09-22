exports.up = function (knex, Promise) {
    return knex.schema.createTable('trip_users', function (table) {
        table.increments();
        
        table.integer('tripsId').notNullable().unsigned();
        table.foreign('tripsId').references('id').inTable('trips')

        table.integer('usersId').notNullable().unsigned();
        table.foreign('usersId').references('id').inTable('users')

        table.timestamp('createdAt').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
        // table.timestamp('updatedAt').defaultTo(knex.raw('NULL ON UPDATE CURRENT_TIMESTAMP'))
        table.datetime('deletedAt');
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('trip_users')
};