exports.up = function (knex, Promise) {
    return knex.schema.createTable('vehicles', function (table) {
        table.increments();
        table.string('name').notNullable();
        table.string('description').notNullable();
        table.integer('capacity').notNullable();
        
        table.timestamp('createdAt').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
        // table.timestamp('updatedAt').defaultTo(knex.raw('NULL ON UPDATE CURRENT_TIMESTAMP'))
        table.datetime('deletedAt');
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('vehicles')
};