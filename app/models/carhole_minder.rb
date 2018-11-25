require 'drb/drb'

DRB_PORT = 9380

class CarholeMinder

  def door_open?
    remote_object.door_open?
  end

  def open_or_close_garage_door
    remote_object.open_or_close_garage_door
  end

  def timer_settings
    remote_object.timer_settings
  end

  def advance_timer_setting
    remote_object.advance_timer_setting
  end

  def timer_setting_index
    remote_object.timer_setting_index
  end

  def door_last_opened_time
    remote_object.door_last_opened_time
  end

  def door_last_closed_time
    remote_object.door_last_closed_time
  end
  
  private
  def remote_object
    @_remote_object ||= begin
      DRb.start_service
      DRbObject.new_with_uri("druby://localhost:#{DRB_PORT}")
    end
  end
end
