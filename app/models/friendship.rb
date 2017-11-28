class Friendship < ApplicationRecord
  validates :requestor_id, :requestee_id, presence: true
  validates :requestor_id, uniqueness: { scope: :requestee_id}

  belongs_to :pending_friend, foreign_key: :requestor_id, class_name: :User
  belongs_to :requested_friend, foreign_key: :requestee_id, class_name: :User
end
