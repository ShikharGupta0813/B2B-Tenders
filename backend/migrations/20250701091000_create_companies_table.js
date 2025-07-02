exports.up = function(knex) {
    return knex.schema.createTable('companies', (table) => {
      table.increments('id');
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
      table.string('name').notNullable();
      table.string('industry');
      table.text('description');
      table.string('image_url'); // for Supabase image
      table.timestamps(true, true);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('companies');
  };
  