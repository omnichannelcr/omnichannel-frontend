/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('messages').del();
  await knex('conversations').del();
  await knex('channels').del();
  await knex('users').del();

  // Inserts seed entries
  await knex('users').insert([
    {
      id: 1,
      email: 'admin@omnichannel.com',
      password_hash: '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
      first_name: 'Admin',
      last_name: 'User',
      role: 'admin',
      is_active: true,
      email_verified: true
    },
    {
      id: 2,
      email: 'agent@omnichannel.com',
      password_hash: '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
      first_name: 'Support',
      last_name: 'Agent',
      role: 'agent',
      is_active: true,
      email_verified: true
    },
    {
      id: 3,
      email: 'customer@example.com',
      password_hash: '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
      first_name: 'John',
      last_name: 'Doe',
      role: 'customer',
      is_active: true,
      email_verified: true
    }
  ]);

  await knex('channels').insert([
    {
      id: 1,
      name: 'Email Support',
      type: 'email',
      is_active: true,
      configuration: {
        smtp_host: 'smtp.example.com',
        smtp_port: 587,
        from_email: 'support@omnichannel.com'
      }
    },
    {
      id: 2,
      name: 'Live Chat',
      type: 'chat',
      is_active: true,
      configuration: {
        widget_id: 'chat_widget_123',
        max_concurrent_chats: 5
      }
    },
    {
      id: 3,
      name: 'Phone Support',
      type: 'phone',
      is_active: true,
      configuration: {
        twilio_sid: 'twilio_account_sid',
        twilio_token: 'twilio_auth_token'
      }
    },
    {
      id: 4,
      name: 'SMS Support',
      type: 'sms',
      is_active: true,
      configuration: {
        provider: 'twilio',
        phone_number: '+1234567890'
      }
    }
  ]);

  await knex('conversations').insert([
    {
      id: 1,
      user_id: 3,
      channel_id: 1,
      status: 'open',
      subject: 'Product Inquiry',
      priority: 'normal',
      assigned_to: 2
    },
    {
      id: 2,
      user_id: 3,
      channel_id: 2,
      status: 'closed',
      subject: 'Technical Support',
      priority: 'high',
      assigned_to: 2
    }
  ]);

  await knex('messages').insert([
    {
      id: 1,
      conversation_id: 1,
      sender_id: 3,
      content: 'Hi, I have a question about your product features.',
      message_type: 'text',
      is_read: true
    },
    {
      id: 2,
      conversation_id: 1,
      sender_id: 2,
      content: 'Hello! I\'d be happy to help you with that. What specific features are you interested in?',
      message_type: 'text',
      is_read: false
    },
    {
      id: 3,
      conversation_id: 2,
      sender_id: 3,
      content: 'I\'m having trouble logging into my account.',
      message_type: 'text',
      is_read: true
    },
    {
      id: 4,
      conversation_id: 2,
      sender_id: 2,
      content: 'I can help you with that. Can you tell me what error message you\'re seeing?',
      message_type: 'text',
      is_read: true
    },
    {
      id: 5,
      conversation_id: 2,
      sender_id: 3,
      content: 'It says "Invalid credentials" but I\'m sure my password is correct.',
      message_type: 'text',
      is_read: true
    },
    {
      id: 6,
      conversation_id: 2,
      sender_id: 2,
      content: 'I\'ve reset your password. Please check your email for the new temporary password.',
      message_type: 'text',
      is_read: true
    }
  ]);
};
