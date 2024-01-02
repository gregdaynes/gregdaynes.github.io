class Coffee
  attr_reader :flavours, :extras, :rating

  def initialize
    @flavours = %w[Chocolate Honey Toffee]
    @extras = []
    @rating = 'Amazing!'
  end
end
