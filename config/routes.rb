Rails.application.routes.draw do
  root to: 'static_pages#root'
  namespace :api, defaults: { format: :json } do
    resource :session, only: %i[create show destroy]
    resources :users, only: %i[index show create update]
    resources :friendships, only: %i[index create update destroy]
    resources :routes, only: %i[index show create update destroy]
    resources :workouts, only: %i[index show create update destroy]
    resources :comments, only: %i[create destroy]
  end
end
