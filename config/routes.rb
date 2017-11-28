Rails.application.routes.draw do
  root to: 'static_pages#root'
  namespace :api, defaults: { format: :json } do
    resources :users, only: %i[index show create update]
    resource :session, only: %i[create destroy]
    resources :routes, only: %i[index show create update destroy]
    resources :workouts, only: %i[index show create update destroy]
    resources :friendships, only: %i[index create update destroy]
  end
end
