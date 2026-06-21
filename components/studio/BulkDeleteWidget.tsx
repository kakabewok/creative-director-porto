'use client'

import { useState, useEffect, useCallback } from 'react'
import { Card, Button, Checkbox, Dialog, Stack, Text, Spinner, Flex, Box } from '@sanity/ui'
import { useClient } from 'sanity'

interface ProjectItem {
  _id: string
  title: string
  categories?: string[]
}

export function BulkDeleteWidget() {
  const client = useClient({ apiVersion: '2024-01-01' })
  const [projects, setProjects] = useState<ProjectItem[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [isDeleting, setIsDeleting] = useState<boolean>(false)
  const [showConfirm, setShowConfirm] = useState<boolean>(false)

  const fetchProjects = useCallback(async () => {
    setLoading(true)
    try {
      const data = await client.fetch<ProjectItem[]>(
        `*[_type == "project"] | order(_createdAt desc) { _id, title, categories }`
      )
      setProjects(data)
      setSelectedIds(new Set())
    } catch (error) {
      console.error('Failed to fetch projects:', error)
    } finally {
      setLoading(false)
    }
  }, [client])

  useEffect(() => {
    fetchProjects()
  }, [fetchProjects])

  const toggleSelection = (id: string) => {
    const next = new Set(selectedIds)
    if (next.has(id)) {
      next.delete(id)
    } else {
      next.add(id)
    }
    setSelectedIds(next)
  }

  const handleSelectAll = () => {
    if (selectedIds.size === projects.length) {
      setSelectedIds(new Set())
    } else {
      setSelectedIds(new Set(projects.map((p) => p._id)))
    }
  }

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      const transaction = client.transaction()
      selectedIds.forEach((id) => {
        transaction.delete(id)
      })
      await transaction.commit()
      setShowConfirm(false)
      await fetchProjects()
    } catch (error) {
      console.error('Failed to delete projects:', error)
      alert('Failed to delete projects. Check console for details.')
    } finally {
      setIsDeleting(false)
    }
  }

  if (loading && projects.length === 0) {
    return (
      <Card padding={4} radius={2} shadow={1}>
        <Flex align="center" justify="center" gap={3}>
          <Spinner muted />
          <Text muted>Loading projects...</Text>
        </Flex>
      </Card>
    )
  }

  return (
    <Card padding={4} radius={2} shadow={1} tone="transparent">
      <Stack space={4}>
        <Flex align="center" justify="space-between">
          <Text size={2} weight="semibold">
            Bulk Delete Projects
          </Text>
          <Button
            mode="ghost"
            text="Refresh"
            onClick={fetchProjects}
            disabled={isDeleting || loading}
          />
        </Flex>

        {projects.length === 0 ? (
          <Text muted size={1}>No projects found.</Text>
        ) : (
          <Stack space={3}>
            <Flex align="center" gap={2} paddingBottom={2} style={{ borderBottom: '1px solid var(--card-border-color)' }}>
              <Checkbox
                checked={selectedIds.size > 0 && selectedIds.size === projects.length}
                indeterminate={selectedIds.size > 0 && selectedIds.size < projects.length}
                onChange={handleSelectAll}
              />
              <Text size={1} weight="medium">Select All</Text>
            </Flex>

            <Box style={{ maxHeight: '300px', overflowY: 'auto' }}>
              <Stack space={2}>
                {projects.map((project) => (
                  <Flex key={project._id} align="center" gap={3} padding={2} style={{ borderRadius: '4px', backgroundColor: selectedIds.has(project._id) ? 'var(--card-focus-ring-color)' : 'transparent' }}>
                    <Checkbox
                      checked={selectedIds.has(project._id)}
                      onChange={() => toggleSelection(project._id)}
                    />
                    <Box flex={1}>
                      <Text size={1} weight="medium">{project.title || 'Untitled'}</Text>
                      <Text size={0} muted>{project.categories?.length ? project.categories.join(', ') : 'No category'}</Text>
                    </Box>
                  </Flex>
                ))}
              </Stack>
            </Box>

            <Flex justify="flex-end" paddingTop={3}>
              <Button
                tone="critical"
                text={`Delete Selected (${selectedIds.size})`}
                disabled={selectedIds.size === 0 || isDeleting}
                onClick={() => setShowConfirm(true)}
              />
            </Flex>
          </Stack>
        )}
      </Stack>

      {showConfirm && (
        <Dialog
          header="Confirm Deletion"
          id="confirm-delete-dialog"
          onClose={() => setShowConfirm(false)}
          zOffset={1000}
        >
          <Box padding={4}>
            <Stack space={4}>
              <Text>
                Are you sure you want to delete {selectedIds.size} project{selectedIds.size > 1 ? 's' : ''}? This action cannot be undone.
              </Text>
              <Flex gap={3} justify="flex-end">
                <Button mode="ghost" text="Cancel" onClick={() => setShowConfirm(false)} disabled={isDeleting} />
                <Button tone="critical" text={isDeleting ? 'Deleting...' : 'Delete'} loading={isDeleting} onClick={handleDelete} />
              </Flex>
            </Stack>
          </Box>
        </Dialog>
      )}
    </Card>
  )
}
