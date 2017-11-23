class Route < ApplicationRecord
  validates :name, :creator_id, :waypoints, :polyline, :distance, presence: true

  belongs_to :creator, class_name: :User
end
