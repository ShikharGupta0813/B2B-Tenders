exports.up = function(knex) {
    return knex.schema.createTable('tenders', (table) => {
      table.increments('id');
      table.integer('company_id').unsigned().references('id').inTable('companies').onDelete('CASCADE');
      table.string('title').notNullable();
      table.text('description');
      table.date('deadline');
      table.decimal('budget');
      table.timestamps(true, true);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('tenders');
  };
  