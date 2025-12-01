// Data Helper - Easy data loading for Divisions
// Usage: divisions = await DataHelper.getDivisions()

(function () {
  'use strict';

  const DataHelper = {
    // Cache untuk performa
    cache: {},

    /**
     * Load divisions summary (untuk homepage)
     * @returns {Promise<Array>} Array of division summaries
     */
    async getDivisions() {
      const cacheKey = 'divisions_index';
      
      if (this.cache[cacheKey]) {
        return this.cache[cacheKey];
      }

      try {
        const data = await Framework.fetchJSON('storage/data/divisions/index.json');
        this.cache[cacheKey] = data;
        return data;
      } catch (error) {
        console.error('Error loading divisions:', error);
        return [];
      }
    },

    /**
     * Load division detail by ID atau slug
     * @param {number|string} idOrSlug - Division ID or slug
     * @returns {Promise<Object>} Division detail dengan members & programs
     */
    async getDivision(idOrSlug) {
      // Since we renamed files to match slugs, we can just use the slug/ID directly
      // But if it's an ID (number), we might need to look it up if we want to support IDs.
      // For now, let's assume we pass slugs or filenames match.
      
      const cacheKey = `division_${idOrSlug}`;
      
      if (this.cache[cacheKey]) {
        return this.cache[cacheKey];
      }

      try {
        const data = await Framework.fetchJSON(`storage/data/divisions/${idOrSlug}.json`);
        this.cache[cacheKey] = data;
        return data;
      } catch (error) {
        console.error(`Error loading division ${idOrSlug}:`, error);
        return null;
      }
    },

    /**
     * Clear cache (untuk development/testing)
     */
    clearCache() {
      this.cache = {};
      console.log('DataHelper cache cleared');
    }
  };

  // Expose to window
  window.DataHelper = DataHelper;

  // Note: Alpine component 'division_detail' has been moved to DivisionController
  // Use: x-data="$controller('DivisionController').detail" instead

  console.log('✅ DataHelper loaded');

})();
