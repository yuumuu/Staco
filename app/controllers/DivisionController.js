// Division Controller
// Handles divisions list and detail with nested data (members, programs)

BaseController.extend('DivisionController', {
  // List divisions (for homepage)
  list: {
    dataSource: 'data/divisions/index.json',

    // Transform data
    transform(divisions) {
      return divisions.map((div) => ({
        ...div,
        // Add computed properties
        hasMembers: div.member_count > 0,
        hasPrograms: div.program_count > 0,
        detailUrl: `#/divisions/${div.slug}`,
      }));
    },
  },

  // Detail division with nested data
  detail: {
    // Dynamic dataSource based on params
    dataSource(params) {
      return `data/divisions/${params.slug}.json`;
    },

    // Transform nested data
    transform(division) {
      return {
        ...division,

        // Transform members (nested)
        members:
          division.members?.map((member) => ({
            ...member,
            photoUrl: member.photo || '/media/members/default.jpg',
            instagramUrl: `https://instagram.com/${member.instagram.replace(
              '@',
              ''
            )}`,
          })) || [],

        // Transform programs (nested)
        programs:
          division.programs?.map((program) => ({
            ...program,
            statusClass: this.getStatusBadgeClass(program.status),
            dateRange: this.formatDateRange(
              program.start_date,
              program.end_date
            ),
          })) || [],
      };
    },

    // After data loaded
    afterLoad(division) {
      // Update page title
      document.title = `${division.name} - Framework`;

      if (AppConfig.debug) {
        console.log(
          `%c[DivisionController] Loaded: ${division.name}`,
          'color: #8b5cf6; font-weight: bold;'
        );
      }
    },
  },

  // Helper: Status badge class
  getStatusBadgeClass(status) {
    const classes = {
      rencana: 'bg-yellow-100 text-yellow-800',
      berjalan: 'bg-blue-100 text-blue-800',
      selesai: 'bg-green-100 text-green-800',
    };
    return classes[status] || 'bg-gray-100 text-gray-800';
  },

  // Helper: Format date range
  formatDateRange(start, end) {
    if (!start) return '';
    if (!end || start === end) return start;
    return `${start} - ${end}`;
  },
});
