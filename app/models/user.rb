class User < ApplicationRecord
  validates :email, :img_url, :fname, :lname, :birthday, :gender, 
    :password_digest, :session_token, presence: true
  validates :email, :session_token, uniqueness: true
  validates :password, length: { minimum: 6 }, allow_nil: true
  after_initialize :ensure_session_token

  has_many :routes, foreign_key: :creator_id
  has_many :workouts
  has_many :requested_friendships, 
    foreign_key: :requestor_id, 
    class_name: :Friendship
  has_many :pending_friendships, 
    foreign_key: :requestee_id, 
    class_name: :Friendship
  has_many :requested_friends,
    through: :requested_friendships
  has_many :pending_friends,
    through: :pending_friendships

  def confirmed_friends
    requested_friends.where(friendships: { confirmed: true }) |
    pending_friends.where(friendships: { confirmed: true })
  end

  def unconfirmed_pending_friendships
    self.pending_friendships.where(friendships: { confirmed: false })
  end

  def unconfirmed_requested_friendships
    self.requested_friendships.where(friendships: { confirmed: false })
  end

  def all_friends
    # confirmed and unconfirmed
    requested_friends | pending_friends
  end

  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    user && user.is_password?(password) ? user : nil
  end

  attr_reader :password
  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64(16)
  end

  def reset_session_token!
    self.session_token = SecureRandom.urlsafe_base64(16)
    self.save!
    self.session_token
  end
end
