class Comment < ApplicationRecord
  validates :body, :commenter_id, :workout_id, presence: true

  belongs_to :commenter, class_name: :User
  belongs_to :workout
end
