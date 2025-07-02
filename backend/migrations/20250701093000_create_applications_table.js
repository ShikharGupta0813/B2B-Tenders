exports.up = function(knex) {
    return knex.schema.createTable('applications', (table) => {
      table.increments('id');
      table.integer('tender_id').unsigned().references('id').inTable('tenders').onDelete('CASCADE');
      table.integer('company_id').unsigned().references('id').inTable('companies').onDelete('CASCADE');
      table.text('proposal_text');
      table.timestamps(true, true);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('applications');
  };
  