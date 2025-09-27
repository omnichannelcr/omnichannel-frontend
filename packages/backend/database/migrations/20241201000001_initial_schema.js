/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .createTable('users', table => {
      table.increments('id').primary();
      table.string('email', 255).unique().notNullable();
      table.string('password_hash', 255).notNullable();
      table.string('first_name', 100).notNullable();
      table.string('last_name', 100).notNullable();
      table.string('role', 50).defaultTo('user');
      table.boolean('is_active').defaultTo(true);
      table.boolean('email_verified').defaultTo(false);
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
    .createTable('channels', table => {
      table.increments('id').primary();
      table.string('name', 100).notNullable();
      table.string('type', 50).notNullable(); // 'email', 'sms', 'chat', 'phone', 'social'
      table.boolean('is_active').defaultTo(true);
      table.jsonb('configuration'); // Channel-specific settings
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
    .createTable('conversations', table => {
      table.increments('id').primary();
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
      table.integer('channel_id').unsigned().references('id').inTable('channels').onDelete('SET NULL');
      table.string('status', 50).defaultTo('open'); // 'open', 'closed', 'pending'
      table.string('subject', 255);
      table.string('priority', 20).defaultTo('normal'); // 'low', 'normal', 'high', 'urgent'
      table.integer('assigned_to').unsigned().references('id').inTable('users').onDelete('SET NULL');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
      table.timestamp('closed_at');
    })
    .createTable('messages', table => {
      table.increments('id').primary();
      table.integer('conversation_id').unsigned().references('id').inTable('conversations').onDelete('CASCADE');
      table.integer('sender_id').unsigned().references('id').inTable('users').onDelete('SET NULL');
      table.text('content').notNullable();
      table.string('message_type', 50).defaultTo('text'); // 'text', 'image', 'file', 'system'
      table.jsonb('metadata'); // Additional message data
      table.boolean('is_read').defaultTo(false);
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })
    .then(() => {
      // Create indexes for better performance
      return Promise.all([
        knex.schema.raw('CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)'),
        knex.schema.raw('CREATE INDEX IF NOT EXISTS idx_users_role ON users(role)'),
        knex.schema.raw('CREATE INDEX IF NOT EXISTS idx_conversations_user_id ON conversations(user_id)'),
        knex.schema.raw('CREATE INDEX IF NOT EXISTS idx_conversations_status ON conversations(status)'),
        knex.schema.raw('CREATE INDEX IF NOT EXISTS idx_conversations_assigned_to ON conversations(assigned_to)'),
        knex.schema.raw('CREATE INDEX IF NOT EXISTS idx_messages_conversation_id ON messages(conversation_id)'),
        knex.schema.raw('CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at)'),
      ]);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('messages')
    .dropTableIfExists('conversations')
    .dropTableIfExists('channels')
    .dropTableIfExists('users');
};
