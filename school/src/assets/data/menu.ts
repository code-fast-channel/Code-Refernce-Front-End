/******************************************
 *  0 - Not visible
 *  1 - Only read/View access
 *  2 - Full access (add, view, delete)
 ******************************************/

export const defaultMenuListAndEntitlements = [
    {
      pageId: 1, accessTypeId: 0, menu: { name: 'Dashboard', icon: 'dashboard', modelUrl: 'dashboard' },
      subPage: [
        {
          subPageId: 1, accessTypeId: 0, menu: { name: 'Default', url: 'default', icon: 'speed' }
        },
        {
          subPageId: 2, accessTypeId: 0, menu: { name: 'Notice Board', url: 'noticeBoard', icon: 'gradient' }
        },
        {
          subPageId: 3, accessTypeId: 0, menu: { name: 'Time Table', url: 'timeTable', icon: 'watch_later' }
        }
      ]
    },
    {
      pageId: 2, accessTypeId: 0, menu: { name: 'Attendance', icon: 'emoji_people', modelUrl: 'attendance' },
      subPage: [
        {
          subPageId: 1, accessTypeId: 0, menu: { name: 'Student Attendance', url: 'markStuAttendance', icon: 'list_alt' }
        },
        { 
          subPageId: 3, accessTypeId: 0, menu: { name: 'Reset Student Attendance', url: 'resetStuAttendance', icon: 'restore' } 
        }
      ]
    },
    {
      pageId: 3, accessTypeId: 0, menu: { name: 'Rating', icon: 'stars', modelUrl: 'rating' },
      subPage: [
        { 
          subPageId: 1, accessTypeId: 0, menu: { name: 'Student Rating', url: 'markStuRating', icon: 'list_alt' } 
        },
        { 
          subPageId: 2, accessTypeId: 0, menu: { name: 'Current Rating Reports', url: 'specificRatingStu', icon: 'list_alt' } 
        },
        { 
          subPageId: 3, accessTypeId: 0, menu: { name: 'Reset Student Rating', url: 'resetStuRating', icon: 'restore' } 
        }
      ]
    },
    {
      pageId: 4, accessTypeId: 0, menu: { name: 'Student', icon: 'child_care', modelUrl: 'studentguardian' },
      subPage: [
        { 
          subPageId: 1, accessTypeId: 0, menu: { name: 'Student List', url: 'studentMgmt', icon: 'line_style' } 
        },
        { 
          subPageId: 2, accessTypeId: 0, menu: { name: 'New Admission', url: 'newStuGuardianReg', icon: 'sentiment_very_satisfied' } 
        }
      ]
    },
    {
      pageId: 5, accessTypeId: 0, menu: { name: 'Employee', icon: 'person', modelUrl: 'employee' },
      subPage: [
        { 
          subPageId: 1, accessTypeId: 0, menu: { name: 'Employee List', url: 'empmgmt', icon: 'assignment_ind' } 
        }
      ]
    },
    {
      pageId: 6, accessTypeId: 0, menu: { name: 'Guardian', icon: 'wc', modelUrl: 'studentguardian' },
      subPage: [
        { 
          subPageId: 1, accessTypeId: 0, menu: { name: 'Guardian List', url: 'guardianMgmt', icon: 'line_style' } 
        }
      ]
    },
    {
      pageId: 7, accessTypeId: 0, menu: { name: 'Transport', icon: 'commute', modelUrl: 'transport' },
      subPage: [
        { 
          subPageId: 1, accessTypeId: 0, menu: { name: 'Route Management', url: 'routemgmt', icon: 'map' } 
        },
        { 
          subPageId: 2, accessTypeId: 0, menu: { name: 'Vehicle Management', url: 'vehiclemgmt', icon: 'directions_bus' } 
        }
      ]
    },
    {
      pageId: 8, accessTypeId: 0, menu: { name: 'School', icon: 'domain', modelUrl: 'school' },
      subPage: [
        { 
          subPageId: 1, accessTypeId: 0, menu: { name: 'Holiday Management', url: 'holidaymgmt', icon: 'deck' } 
        },
        { 
          subPageId: 2, accessTypeId: 0, menu: { name: 'Events Management', url: 'eventmgmt', icon: 'group_work' } 
        },
        { 
          subPageId: 3, accessTypeId: 0, menu: { name: 'Subject Management', url: 'subjectmgmt', icon: 'menu_book' } 
        },
        { 
          subPageId: 4, accessTypeId: 0, menu: { name: 'Class Management', url: 'classmgmt', icon: 'ballot' } 
        },
        { 
          subPageId: 5, accessTypeId: 0, menu: { name: 'User Role Management', url: 'rolemgmt', icon: 'android' } 
        },
        { 
          subPageId: 6, accessTypeId: 0, menu: { name: 'School Details', url: 'schoolmgmt', icon: 'business' } 
        }        
      ]
    },
    {
      pageId: 9, accessTypeId: 0, menu: { name: 'Exam', icon: 'chrome_reader_mode', modelUrl: 'exam' },
      subPage: [        
        { 
          subPageId: 1, accessTypeId: 0, menu: { name: 'Exam Management', url: 'exammgmt', icon: 'chrome_reader_mode' } 
        },
        { 
          subPageId: 2, accessTypeId: 0, menu: { name: 'Exam Types', url: 'examtypemgmt', icon: 'developer_board' } 
        }
      ]
    },
  
  ]