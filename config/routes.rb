Rails.application.routes.draw do
  root 'garage_status#view'
  put 'garage_control/open_close', :defaults => { :format => 'json' }
  put 'garage_control/timer_advance', :defaults => { :format => 'json' }
  get 'garage_status/view'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
