class GarageControlController < ApplicationController
  before_action :set_minder, only: [ :open_close, :timer_advance ]

  def open_close
    respond_to do |format|
      format.json { render :json => @minder.open_or_close_garage_door }
    end
  end

  def timer_advance
    respond_to do |format|
      format.json { render :json => @minder.advance_timer_setting }
    end
  end

  private
  def set_minder
    @minder = CarholeMinder.new
  end
end
