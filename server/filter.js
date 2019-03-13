const filter = arr => {
  let filtered = [];
  arr.forEach(venue => {
    venue.categories.forEach(category => {
      if (
        category.name === "Amphitheater" ||
        category.name === "Concert Hall" ||
        category.name === "Music Venue" ||
        category.name === "Jazz Club" ||
        category.name === "Piano Bar" ||
        category.name === "Rock Club" ||
        category.name === "Music Festival" ||
        category.name === "Convention" ||
        category.name === "Festival" ||
        category.name === "Nightlife Spot" ||
        category.name === "Performing Arts Venue"
      ) {
        if (venue.events) {
          filtered.push(venue);
        }
      }
    });
  });
  return filtered;
};

module.exports = { filter };

// [i]categories[j].name
