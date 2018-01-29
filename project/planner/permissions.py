from rest_framework import permissions


class SearchIsOwnerOrReadOnly(permissions.BasePermission):
	'''
	Custom permission to allow owners of a Flight search object to view it it.
	'''
	def has_object_permission(self, request, view, obj):
		if request.method in permissions.SAFE_METHODS:
			return True
		return request.user == obj.user	

#May not be necessary