exports.up = function (knex, Promise) {
    return knex.schema.createTable('trips', function (table) {
        table.increments();
        
        table.integer('vehicleId').notNullable().unsigned();
        table.foreign('vehicleId').references('id').inTable('vehicles')

        table.integer('schedulingId').notNullable().unsigned();
        table.foreign('schedulingId').references('id').inTable('schedulings')

        table.timestamp('createdAt').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
        // table.timestamp('updatedAt').defaultTo(knex.raw('NULL ON UPDATE CURRENT_TIMESTAMP'))
        table.datetime('deletedAt');
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('trips')
};