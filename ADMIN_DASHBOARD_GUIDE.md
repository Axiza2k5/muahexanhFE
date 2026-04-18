# Admin Dashboard - Project Management Implementation

## Overview
This document describes the Admin Dashboard implementation for managing project statuses in the Mua Hè Xanh platform.

## Features Implemented

### 1. **View All Projects**
- Admin can view all projects in the system
- Projects are displayed in a table format with the following columns:
  - Project Title (with description)
  - Leader Name (with Leader ID)
  - Start Date
  - Number of Participants
  - Current Status (with colored badge)
  - Status Update Action (dropdown)

### 2. **Project Status Management**
- Status dropdown for each project showing all available statuses:
  - **PENDING** - New projects awaiting approval (amber)
  - **APPROVED** - Approved projects (blue)
  - **REJECTED** - Rejected projects (red)
  - **IN_PROGRESS** - Currently running projects (purple)
  - **COMPLETED** - Finished projects (green)

### 3. **Status Update with Validation**
- When admin changes status, the system:
  1. Updates UI optimistically
  2. Sends PATCH request to `/api/v1/projects/{id}`
  3. Shows loading indicator during update
  4. Displays success toast on completion
  5. Shows specific error messages on failure
  6. Reverts UI if update fails

### 4. **Business Logic Constraints** (enforced by backend)
- Only projects with status `PENDING` can be changed to `APPROVED` or `REJECTED`
- Other status transitions are allowed freely
- Admin-only endpoint protection

### 5. **Status Statistics**
- Display counts of projects in each status category
- Visual cards at bottom of dashboard showing:
  - Number of PENDING projects
  - Number of APPROVED projects
  - Number of IN_PROGRESS projects
  - Number of COMPLETED projects

## File Structure

### New Files Created
```
muahexanhFE/
├── src/
│   ├── api/
│   │   └── projects.ts          # Projects API client
│   ├── pages/
│   │   └── AdminDashboard.tsx   # Admin dashboard component
│   └── App.tsx                  # Updated to use AdminDashboard
```

### Modified Files
```
muahexanhFE/
├── src/
│   ├── App.tsx                  # Import AdminDashboard, replace ComingSoon
```

## API Integration

### Endpoint Used
- **Method**: `PATCH`
- **URL**: `/api/v1/projects/{id}`
- **Authorization**: Bearer token (JWT)
- **Role Required**: `UNI_ADMIN`

### Request Body
```json
{
  "status": "APPROVED" | "REJECTED" | "IN_PROGRESS" | "COMPLETED"
}
```

### Response
```json
{
  "id": 1,
  "title": "Project Title",
  "description": "Description",
  "requiredSkills": "Skill1, Skill2",
  "startTime": "2026-07-01T08:00:00",
  "endTime": "2026-07-30T17:00:00",
  "amountOfParticipants": 20,
  "status": "APPROVED",
  "leaderId": 2,
  "leaderName": "Leader One",
  "createdAt": "2026-06-01T10:00:00"
}
```

## Component Breakdown

### AdminDashboard.tsx
Main admin dashboard component with:
- **State Management**: Projects array, loading state, error state
- **Data Fetching**: Fetches all projects on component mount
- **Status Change Handler**: Handles status dropdown changes with optimistic updates
- **Error Handling**: Displays error messages with retry option
- **UI Components**: Uses Button, Loader, AlertCircle icons from lucide-react

### Key Features
1. **Loading State**: Shows spinner while fetching projects
2. **Error State**: Shows error message with retry button
3. **Empty State**: Shows message when no projects available
4. **Optimistic Updates**: Updates UI immediately before server confirmation
5. **Revert on Error**: Reverts to previous status if update fails
6. **Toast Notifications**: Shows success/error messages
7. **Status Colors**: Each status has unique color scheme for quick identification

### Projects API (projects.ts)
- `getAllProjects()` - Fetch all projects
- `getProjectById(id)` - Fetch single project
- `updateProject(id, data)` - Update any project fields
- `updateProjectStatus(id, status)` - Update only status

## Usage

### For Admin Users
1. Login with UNI_ADMIN role credentials
2. Navigate to "Admin Panel" from sidebar
3. View all projects in table format
4. Click status dropdown for any project
5. Select new status from dropdown
6. System validates and updates the project
7. Success message appears if update successful
8. Error message appears if update fails

### Example Status Workflows
1. **New Project Approval**
   - PENDING → APPROVED (if project is good)
   - PENDING → REJECTED (if project doesn't meet criteria)

2. **Running Project**
   - APPROVED → IN_PROGRESS (when project starts)

3. **Completed Project**
   - IN_PROGRESS → COMPLETED (when project finishes)

## Error Handling

### Common Errors
- **"Only PENDING projects can be APPROVED or REJECTED"**
  - Trying to approve/reject a non-PENDING project
  
- **"Failed to update project status"**
  - Network error or backend issue
  - User can retry fetching projects

- **"Failed to load projects"**
  - Initial fetch failed
  - Retry button available

## Color Scheme Used
- **PENDING**: Amber (bg-amber-50, text-amber-700)
- **APPROVED**: Blue (bg-blue-50, text-blue-700)
- **REJECTED**: Red (bg-red-50, text-red-700)
- **IN_PROGRESS**: Purple (bg-purple-50, text-purple-700)
- **COMPLETED**: Green (bg-green-50, text-green-700)

## Styling Details
- Tailwind CSS for responsive design
- Table layout with grid system
- Hover effects on rows
- Disabled state for updating projects
- Status badges with colored dots
- Responsive columns for different screen sizes

## Performance Considerations
- Projects fetched once on component mount
- Optimistic updates provide instant UI feedback
- Conditional loading indicators during updates
- Efficient state updates for large project lists

## Future Enhancements
1. Add pagination for large project lists
2. Add sorting by columns (title, leader, date, status)
3. Add filtering by status
4. Add search functionality
5. Add bulk status update operations
6. Add project detail modal/drawer
7. Add ability to edit other project fields
8. Add activity logs/audit trail

## Backend Requirements
- Project API endpoint at `/api/v1/projects`
- PATCH endpoint for updating projects at `/api/v1/projects/{id}`
- Proper JWT token validation
- Status validation (PENDING only for APPROVE/REJECT)
- Response includes updated project data
