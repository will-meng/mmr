class Workout < ApplicationRecord
  validates :name, :user_id, :date, :route_id, :hours, :mins, :secs,
    presence: true

  belongs_to :user
end
