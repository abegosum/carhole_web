require 'date'

class GarageStatusController < ApplicationController
  before_action :set_minder, only: [ :view ]
  helper_method :timer_class

  def view
    @last_open = Time.at(@minder.door_last_opened_time).to_datetime if @minder.door_last_opened_time
    @last_closed = Time.at(@minder.door_last_closed_time).to_datetime if @minder.door_last_closed_time
  end
  
  private
  def set_minder
    @minder = CarholeMinder.new
  end

  def timer_class(timer_index)
    if timer_index == @minder.timer_setting_index
      "timer-selection-highlight"
    else
      "timer-highlight"
    end
  end
end
