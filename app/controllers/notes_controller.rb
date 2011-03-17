class NotesController < ApplicationController

  respond_to :html, :json

  def index
    @notes = Note.all
    respond_with @notes
  end

  def show
    @note = Note.find(params[:id])
  end

  def create
    Note.create!(params[:note])
    redirect_to notes_path
  end
  
  def offline
    
  end
end
