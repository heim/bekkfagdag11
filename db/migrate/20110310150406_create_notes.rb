class CreateNotes < ActiveRecord::Migration
  def self.up
    create_table :notes do |t|
      t.text :note_text
      t.timestamps
    end
  end

  def self.down
    drop_table :notes
  end
end
