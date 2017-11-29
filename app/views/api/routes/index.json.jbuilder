json.routes do
  @routes.each do |route|
    json.set! route.id do
      json.partial! 'route', route: route
    end
  end
end

if @user
  json.users do
    json.set! @user.id do
      json.routeIds @routes.pluck(:id)
    end
  end
end