Rails.application.routes.draw do
  put 'garage_control/open_close', :defaults => { :format => 'json' }
  put 'garage_control/timer_advance', :defaults => { :format => 'json' }
  get 'garage_status/view'
  get 'garage_status/door_open', :defaults => { :format => 'json' }
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
