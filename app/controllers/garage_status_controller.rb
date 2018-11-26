require 'date'

class GarageStatusController < ApplicationController
  before_action :set_minder, only: [ :view, :door_open ]
  helper_method :timer_class

  def view
    @last_open = Time.at(@minder.door_last_opened_time).to_datetime if @minder.door_last_opened_time
    @last_closed = Time.at(@minder.door_last_closed_time).to_datetime if @minder.door_last_closed_time
    respond_to do |format|
      format.html
      format.json {
        garage_status = Hash.new
        garage_status[:door_is_open] = @minder.door_open?
        garage_status[:door_last_opened_time] = @minder.door_last_opened_time
        garage_status[:door_last_closed_time] = @minder.door_last_closed_time
        garage_status[:available_timer_settings] = @minder.timer_settings
        garage_status[:selected_timer_index] = @minder.timer_setting_index
        garage_status[:selected_timer_setting] = @minder.timer_settings[@minder.timer_setting_index]
        render :json => garage_status.to_json
      }
    end
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
