Whenevernote::Application.routes.draw do
  resources :notes
  root :to => 'notes#index'
  match 'offline' => 'notes#offline'
  
  #match "/application.manifest" => Rails::Offline
  
end
