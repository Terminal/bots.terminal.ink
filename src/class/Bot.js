/**
 * A class that represents a bot.
 * Includes data synchronisation with RethinkDB, so everything is fancy dancy
 */
class Bot {
  /**
   * Creates or obtains a bot object.
   * Obtains data from a database if required.
   * @param {string} bot The ID of the bot
   */
  constructor (bot) {
    // Get existing results, if they exist
    if (typeof bot !== 'string') {
      throw new Error('The constructor should give a string')
    }

    this._id = bot
    this._name = 'Unknown Name'
    this._invite = 'https://example.com/'
    this._prefix = 'Unknown Prefix'
    this._description = ''
    this._avatar = ''
    this._images = new Set()
    this._banner = ''
    this._owners = new Map()
    this._approved = false
  }

  get id () {
    return this._id
  }

  get name () {
    return this._name
  }

  get invite () {
    return this._invite
  }

  get prefix () {
    return this._prefix
  }

  get description () {
    return this._description
  }

  get avatar () {
    return this._avatar
  }

  get images () {
    return this._images
  }

  get banner () {
    return this._banner
  }

  get owners () {
    return this._owners
  }

  get approved () {
    return this._approved
  }

  set id (value) {
    throw new Error(`Editing the ID is strictly prohibited. The ID ${this._id} will not be changed to ${value}.`)
  }

  set name (value) {
    if (typeof value !== 'string') throw new Error('Value needs to be a string')
    if (value.length > 32) throw new Error('Value length exceeds 32 characters')
    this._name = value
  }

  set invite (value) {
    if (typeof value !== 'string') throw new Error('Value needs to be a string')
    if (value.length > 256) throw new Error('Value length exceeds 256 characters')
    this._invite = value
  }

  set prefix (value) {
    if (typeof value !== 'string') throw new Error('Value needs to be a string')
    if (value.length > 32) throw new Error('Value length exceeds 32 characters')
    this._prefix = value
  }

  set description (value) {
    if (typeof value !== 'string') throw new Error('Value needs to be a string')
    if (value.length > 8096) throw new Error('Value length exceeds 8096 characters')
    this._description = value
  }

  set avatar (value) {
    if (typeof value !== 'string') throw new Error('Value needs to be a string')
    if (value.length > 2048) throw new Error('Value length exceeds 2048 characters')
    this._avatar = value
  }

  set approved (value) {
    if (typeof value !== 'boolean') throw new Error('Value needs to be a boolean')
    this._approved = value
  }

  set banner (value) {
    if (typeof value !== 'string') throw new Error('Value must be a string')
    this._banner = value
  }

  /**
   * Check if the bot has a specific owner, and returns the permission level
   * `3` - Can delete
   * `2` - Can edit
   * `1` - Labelled
   * @param id The ID of the user
   * @returns {Number} The permission level. `0` if not an owner. Administrators are always level 3
   */
  getOwner (id) {
    return this._owners.get(id) || 0
  }

  /**
   * Add or set an owner of the bot with a permission level
   * @param id The ID of the user
   * @param permission The permission level of the user. `1`, `2` or `3`. Level `0` will delete.
   */
  setOwner (id, permission) {
    if (permission === 0) { // Permission 0 means "delete"
      this.removeOwner(id)
    } else if (permission === 1 || permission === 2 || permission === 3) { // Verbose is good
      this._owners.set(id, permission)
    } else {
      throw new Error('The permission level was not `0`, `1`, `2` or `3`.')
    }
  }

  /**
   * Add or set an owner of the bot with a permission level
   * Is the "non-preferred" alias for `.setOwner()`
   * @param id The ID of the user
   * @param permission The permission level of the user. `1`, `2` or `3`. Level `0` will delete.
   */
  addOwner (id, permission) {
    this.setOwner(id, permission)
  }

  /**
   * Remove an owner of the bot
   * @param id The ID of the user
   * @returns {Promise} The promise from RethinkDB that removed the user
   */
  removeOwner (id) {
    this._owners.delete(id)
  }

  /**
   * Add an image to the images collection
   * @param hash The hash of the image
   */
  addImage (hash) {
    this._images.add(hash)
  }

  /**
   * Remove an image from the images collection
   * @param hash The hash of the image
   */
  removeImage (hash) {
    this._images.delete(hash)
  }

  /**
   * Get the current data from an object
   */
  get (bot) {
    this._name = bot.name || 'Unknown Name'
    this._invite = bot.invite || 'https://example.com/'
    this._prefix = bot.prefix || 'Unknown Prefix'
    this._description = bot.description
    this._avatar = bot.avatar
    this._images = new Set(bot.images)
    this._banner = bot.banner || ''
    this._owners = new Map(bot.owners)
    this._approved = bot.approved || false
  }
}

module.exports = Bot
