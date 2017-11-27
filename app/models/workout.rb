class Workout < ApplicationRecord
  validates :name, :user_id, :date, :route_id, presence: true
  validate :duration_is_valid

  belongs_to :user

  def duration_is_valid
    self.errors[:duration] << "can't be blank" if hours + mins + secs <= 0
  end
end
