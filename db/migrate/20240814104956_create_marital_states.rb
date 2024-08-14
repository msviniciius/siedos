class CreateMaritalStates < ActiveRecord::Migration[5.1]
  def change
    create_table :marital_states do |t|
      t.string :title

      t.timestamps
    end
  end
end
