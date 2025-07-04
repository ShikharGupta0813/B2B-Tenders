exports.up = function(knex) {
  return knex.schema.createTable('companies', (table) => {
    table.increments('id');
    table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
    table.string('name').notNullable();
    table.string('industry');
    table.text('description');
    table.string('image_url'); // For Supabase image
    table.string('website_url');
    table.string('contact_email');
    table.string('phone_number');
    table.text('services'); // Can be comma-separated or JSON string
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('companies');
};
