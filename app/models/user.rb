class User < ApplicationRecord
  validates :email, :fname, :lname, :birthday, :password_digest, :session_token, 
    presence: true
  validates :email, :session_token, uniqueness: true
  validates :password, length: { minimum: 6 }, allow_nil: true
  after_initialize :ensure_session_token

  has_attached_file :image, styles: { medium: "300x300>", thumb: "100x100>" }, 
    default_url: "default_avatar.jpg"
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\z/

  has_many :routes, foreign_key: :creator_id
  has_many :workouts
  has_many :comments, foreign_key: :commenter_id
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

  attr_reader :password, :distance, :num_workouts, :num_routes, :hours, :mins
  def calculate_lifetime_stats
    @distance, hours, mins, secs = 0, 0, 0, 0
    @num_workouts = self.workouts.length
    @num_routes = self.routes.length
    self.workouts.each do |workout|
      @distance += workout.distance
      hours += workout.hours
      mins += workout.mins
      secs += workout.secs
    end
    total_hours = hours + mins / 60.0 + secs / 3600.0
    @hours = total_hours.floor
    @mins = ((total_hours - @hours) * 60).round
  end

  def recent_workouts
    self.workouts.order(created_at: :desc).limit(3)
  end

  def recent_routes
    self.routes.order(created_at: :desc).limit(4)
  end

  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    user && user.is_password?(password) ? user : nil
  end

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
