module Jekyll
  module SafeName
    def safe(str)
      str.downcase
         .gsub(/\s+/, '-')
         .gsub(/[^a-z0-9-]+/, '')
         .gsub(/--+/, '-')
    end
  end
end

Liquid::Template.register_filter(Jekyll::SafeName)
