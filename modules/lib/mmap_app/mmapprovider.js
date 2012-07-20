
$(function(){

  var bingKey = 'Anmc0b2q6140lnPvAj5xANM1rvF1A4CvVtr6H2VJvQcdnDvc8NL' + 
                '-I2C49owIe9xC';

  window.MMapProviderModel = Backbone.Model.extend({

    defaults: function () {
      return { provider: 'bingaerial' };
    },

    validate: function ( attrs ) {
      if (!(attrs.provider in this.providers)) {
        return "must set provider to a key in providers table";
      }
    },

    initialize: function () {
      console.log('mmap provider model initialize');
    },

    providers: {
      bingaerial: {
        description: "Bing Aerial",
        constructor: function (onready) {
          return new MM.BingProvider(bingKey, 'AerialWithLabels', onready); }
      },
      bingbirdseye: {
        description: "Bing Birdseye",
        constructor: function (onready) {
          return new MM.BingProvider(bingKey, 'BirdseyeWithLabels', onready); }
      },
      bingroad: {
        description: "Bing Road",
        constructor:  function (onready) {
          return new MM.BingProvider(bingKey, 'Road', onready);}
      },
      bluemarble: {
        description: "Blue Marble",
        constructor: function (onready) {
          var provider = new MM.BlueMarbleProvider();
          if (onready) { onready(provider ); }
          return provider;
        }
      }
    },

    providerDescriptions: function () {
      return _.pluck(this.providers, 'description');
    },
    
    getProvider: function () {
      var k = this.get('provider');
      return this.providers[k];
    }
  });


  window.MMapSettingsView = Backbone.View.extend({
    template: _.template($('#mapsettingsviewtemplate').html()),

    initialize: function () {
      this.providerModel = this.options.providerModel;
      this.renderModel   = this.options.renderModel;

      $('#mapsettingsview').replaceWith(this.render().el);
      this.setupProviderDropdown();
    },

    setupProviderDropdown: function () {
      var input_el = $('#mapproviderpicker');
      var self = this;
      _.each( this.providerModel.providers, function (provider, name) {
        input_el.append('<option value="' + name + '">' +
                        provider.description + '</option>'); 
      });
      input_el.change(function() {
        var newprovider = input_el.val();
        self.providerModel.set('provider', newprovider);
      });
    },

    render: function () {
      this.$el.html(this.template({}));
      return this;
    }
  });

  window.MMapProviderView = Backbone.View.extend({
    initialize: function () {
      this.model.bind('change', this.render, this);
      this.render();
    },

    render: function () {
      var provider = this.model.get('provider');
      $('#mapproviderdebug').html(provider);
    }
  });
});
