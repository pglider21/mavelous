goog.provide('Mavelous.AirspeedButton');



/**
 * Airspeed readout button.
 * @param {{mavlinkSrc: Mavelous.MavlinkAPI, el: (Element|jQuery)}} properties
 *     Button properties.
 * @constructor
 * @extends {Backbone.View}
 */
Mavelous.AirspeedButton = function(properties) {
  goog.base(this, properties);
};
goog.inherits(Mavelous.AirspeedButton, Backbone.View);


/**
 * @override
 * @export
 */
Mavelous.AirspeedButton.prototype.initialize = function() {
  var mavlink = this.options['mavlinkSrc'];
  this.controlstates = mavlink.subscribe('VFR_HUD', this.onSysStatus, this);
  this.$el = this.options['el'];
};


/**
 * Handles CONTROL_SYSTEM_STATE mavlink messages.
 */
Mavelous.AirspeedButton.prototype.onSysStatus = function() {
  var stat = this.controlstates;
  var airspeed = stat.get('airspeed');
  if (airspeed == -1) {
     this.setButton_('btn-inverse','Unknown');
 }else { 
  this.setButton_('btn-success', airspeed.toFixed(3) + 'm/s');
 }     
};


/**
 * Sets the button state.
 * @param {string} cssClass The CSS class.
 * @param {string} textLabel The button label.
 * @private
 */
Mavelous.AirspeedButton.prototype.setButton_ = function(cssClass, textLabel) {
  this.$el.removeClass('btn-success btn-inverse');
  this.$el.addClass(cssClass);
  var html = '<span class="hidden-phone">AirSpd: ' + textLabel + '</span>';
  html += '<i class="icon-fire icon-white visible-phone"></i>';
  this.$el.html(html);
};
