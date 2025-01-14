function formatTitle(title) {
  // Remove special characters
  let formattedTitle = title.replace(/[^a-zA-Z0-9\s|-]/g, "");

  // Capitalize the first letter of each word
  formattedTitle = formattedTitle
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  return formattedTitle;
}

function slugify({ title, unique = false }) {
  // Convert the title to lowercase
  let slug = title.toLowerCase();

  // Replace spaces and special characters with hyphens
  slug = slug.replace(/[^a-z0-9]+/g, "-");

  // Remove leading and trailing hyphens
  slug = slug.replace(/^-+|-+$/g, "");

  // If unique is true, append the current timestamp
  if (unique) {
    const timestamp = Date.now();
    slug = `${slug}-${timestamp}`;
  }

  return slug;
}

module.exports = { formatTitle, slugify };
