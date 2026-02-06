# Tags and Categories API Integration

This document provides examples of how to use the Tags and Categories API services and hooks in your components.

## Services Created

### Tags Service

- **Location**: `src/services/tags/`
- **Files**:
  - `index.ts` - Service implementation
  - `types.ts` - TypeScript type definitions

### Categories Service

- **Location**: `src/services/categories/`
- **Files**:
  - `index.ts` - Service implementation
  - `types.ts` - TypeScript type definitions

### API Hooks

- **Tags Hooks**: `src/hooks/api/tags/index.tsx`
- **Categories Hooks**: `src/hooks/api/categories/index.tsx`

---

## Usage Examples

### 1. Using Tags in a Component

```tsx
"use client";

import { useEffect } from "react";
import TagsService from "@/services/tags";
import {
  useGetTags,
  useCreateTag,
  useUpdateTag,
  useDeleteTag,
} from "@/hooks/api/tags";

export default function TagsPage() {
  // Initialize hooks
  const { loading, tags, fetchTags } = useGetTags({ Service: TagsService });
  const { loading: creating, createTag } = useCreateTag({
    Service: TagsService,
  });
  const { loading: updating, updateTag } = useUpdateTag({
    Service: TagsService,
  });
  const { loading: deleting, deleteTag } = useDeleteTag({
    Service: TagsService,
  });

  // Fetch tags on component mount
  useEffect(() => {
    fetchTags({ search: "", page: 1, limit: 10 });
  }, []);

  // Create a new tag
  const handleCreateTag = async () => {
    await createTag({
      data: {
        name: "New Tag",
        type: 1,
        status: "Active",
      },
      successCallback: () => {
        // Refresh the tags list
        fetchTags();
      },
    });
  };

  // Update an existing tag
  const handleUpdateTag = async (tagId: string) => {
    await updateTag({
      data: {
        id: tagId,
        name: "Updated Tag Name",
        type: 2,
      },
      successCallback: () => {
        fetchTags();
      },
    });
  };

  // Delete a tag
  const handleDeleteTag = async (tagId: string) => {
    await deleteTag({
      data: { id: tagId },
      successCallback: () => {
        fetchTags();
      },
    });
  };

  return (
    <div>
      {loading ? (
        <p>Loading tags...</p>
      ) : (
        <ul>
          {tags.map((tag) => (
            <li key={tag.id}>
              {tag.name}
              <button onClick={() => handleUpdateTag(tag.id)}>Edit</button>
              <button onClick={() => handleDeleteTag(tag.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
      <button onClick={handleCreateTag} disabled={creating}>
        {creating ? "Creating..." : "Add New Tag"}
      </button>
    </div>
  );
}
```

### 2. Using Categories in a Component

```tsx
"use client";

import { useEffect } from "react";
import CategoriesService from "@/services/categories";
import {
  useGetCategories,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
} from "@/hooks/api/categories";

export default function CategoriesPage() {
  // Initialize hooks
  const { loading, categories, fetchCategories } = useGetCategories({
    Service: CategoriesService,
  });
  const { loading: creating, createCategory } = useCreateCategory({
    Service: CategoriesService,
  });
  const { loading: updating, updateCategory } = useUpdateCategory({
    Service: CategoriesService,
  });
  const { loading: deleting, deleteCategory } = useDeleteCategory({
    Service: CategoriesService,
  });

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories({ name: "", page: 1, limit: 10 });
  }, []);

  // Create a new category
  const handleCreateCategory = async () => {
    await createCategory({
      data: {
        name: "New Category",
        description: "Category description",
        status: "Active",
      },
      successCallback: () => {
        fetchCategories();
      },
    });
  };

  // Update an existing category
  const handleUpdateCategory = async (categoryId: string) => {
    await updateCategory({
      data: {
        id: categoryId,
        name: "Updated Category",
        description: "Updated description",
      },
      successCallback: () => {
        fetchCategories();
      },
    });
  };

  // Delete a category
  const handleDeleteCategory = async (categoryId: string) => {
    await deleteCategory({
      data: { id: categoryId },
      successCallback: () => {
        fetchCategories();
      },
    });
  };

  return (
    <div>
      {loading ? (
        <p>Loading categories...</p>
      ) : (
        <ul>
          {categories.map((category) => (
            <li key={category.id}>
              <h3>{category.name}</h3>
              <p>{category.description}</p>
              <button onClick={() => handleUpdateCategory(category.id)}>
                Edit
              </button>
              <button onClick={() => handleDeleteCategory(category.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
      <button onClick={handleCreateCategory} disabled={creating}>
        {creating ? "Creating..." : "Add New Category"}
      </button>
    </div>
  );
}
```

### 3. Search and Filter Examples

```tsx
// Search tags
const handleSearchTags = (searchTerm: string) => {
  fetchTags({
    search: searchTerm,
    page: 1,
    limit: 20,
  });
};

// Filter tags by type
const handleFilterByType = (type: string) => {
  fetchTags({
    type: type,
    page: 1,
    limit: 20,
  });
};

// Search categories
const handleSearchCategories = (searchTerm: string) => {
  fetchCategories({
    name: searchTerm,
    page: 1,
    limit: 20,
  });
};
```

### 4. Pagination Example

```tsx
const [currentPage, setCurrentPage] = useState(1);
const pageSize = 10;

// Fetch paginated data
useEffect(() => {
  fetchTags({
    search: "",
    page: currentPage,
    limit: pageSize,
  });
}, [currentPage]);

// Next page
const handleNextPage = () => {
  setCurrentPage((prev) => prev + 1);
};

// Previous page
const handlePrevPage = () => {
  setCurrentPage((prev) => Math.max(1, prev - 1));
};
```

---

## API Endpoints

### Tags Endpoints

- `GET /api/v1/tags` - Get all tags
- `GET /api/v1/tags/:id` - Get tag by ID
- `POST /api/v1/tags` - Create new tag
- `PUT /api/v1/tags/:id` - Update tag
- `DELETE /api/v1/tags/:id` - Delete tag

### Categories Endpoints

- `GET /api/v1/categories` - Get all categories
- `GET /api/v1/categories/:id` - Get category by ID
- `POST /api/v1/categories` - Create new category
- `PUT /api/v1/categories/:id` - Update category
- `DELETE /api/v1/categories/:id` - Delete category

---

## Available Hooks

### Tags Hooks

- `useGetTags` - Fetch all tags with optional filters
- `useGetTagById` - Fetch a single tag by ID
- `useCreateTag` - Create a new tag
- `useUpdateTag` - Update an existing tag
- `useDeleteTag` - Delete a tag

### Categories Hooks

- `useGetCategories` - Fetch all categories with optional filters
- `useGetCategoryById` - Fetch a single category by ID
- `useCreateCategory` - Create a new category
- `useUpdateCategory` - Update an existing category
- `useDeleteCategory` - Delete a category

---

## Type Definitions

### Tag Types

```typescript
type TCreateTagPayload = {
  name: string;
  type?: number;
  status?: string;
};

type TUpdateTagPayload = {
  id: string;
  name?: string;
  type?: number;
  status?: string;
};
```

### Category Types

```typescript
type TCreateCategoryPayload = {
  name: string;
  description?: string;
  parent_category_id?: string;
  status?: string;
};

type TUpdateCategoryPayload = {
  id: string;
  name?: string;
  description?: string;
  parent_category_id?: string;
  status?: string;
};
```

---

## Error Handling

All hooks automatically handle errors and display toast notifications using the `showErrorToast` and `showSuccessToast` utilities. You don't need to manually handle errors in most cases.

## Loading States

Each hook provides a `loading` state that you can use to show loading indicators:

```tsx
const { loading, tags, fetchTags } = useGetTags({ Service: TagsService });

{
  loading ? <Spinner /> : <TagsList tags={tags} />;
}
```
