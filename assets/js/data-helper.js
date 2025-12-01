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
        const data = await Framework.fetchJSON('data/divisions/index.json');
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
      // Cek apakah input adalah slug atau ID
      const isSlug = typeof idOrSlug === 'string' && isNaN(idOrSlug);
      
      if (isSlug) {
        // Jika slug, cari ID dari index dulu
        const divisions = await this.getDivisions();
        const division = divisions.find(d => d.slug === idOrSlug);
        
        if (!division) {
          console.error(`Division with slug "${idOrSlug}" not found`);
          return null;
        }
        
        idOrSlug = division.division_id;
      }

      const cacheKey = `division_${idOrSlug}`;
      
      if (this.cache[cacheKey]) {
        return this.cache[cacheKey];
      }

      try {
        const data = await Framework.fetchJSON(`data/divisions/${idOrSlug}.json`);
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
