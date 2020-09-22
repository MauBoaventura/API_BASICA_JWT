exports.up = function (knex, Promise) {
    return knex.schema.createTable('schedulings', function (table) {
        table.increments();
        table.time('startTime').notNullable();
        table.time('endTime').notNullable();

        table.datetime('specificDay');
        
        table.string('weekDays');
        
        table.datetime('startDay');
        table.datetime('endDay');
        
        table.timestamp('createdAt').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
        // table.timestamp('updatedAt').defaultTo(knex.raw('NULL ON UPDATE CURRENT_TIMESTAMP'))
        table.datetime('deletedAt');
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('schedulings')
};