class Cup
  attr_accessor :filling
  attr_reader :filling

  def initialize
    @filling = nil
  end

  def add(new_contents)
    raise unless new_contents.class == Coffee
    @filling = new_contents
  end

  def empty?
    @filling.nil?
  end

  def drink
    @filling = nil
  end

  def slow_drink
    sleep 10
    puts '*slurp*'
    sleep 10
    puts '*slurp*'
    sleep 10
    @filling = nil
  end
end
