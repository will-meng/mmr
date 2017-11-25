Rails.application.routes.draw do
  root to: 'static_pages#root'
  namespace :api, defaults: { format: :json } do
    resources :users, only: %i[index show create update]
    resource :session, only: %i[create destroy]
    resources :routes, only: %i[index show create update destroy]
  end
end
