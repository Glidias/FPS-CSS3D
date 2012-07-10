package a3d;

/**
 * All the necessary face stream information
 * @author Glenn Ko
 */

import glidias.TypeDefs;
import glidias.XYZ;
import jeash.geom.Vector3D;

class FaceBuffer 
{
	private var normals:Vector<Float>;
	private var indices:Vector<Int>;
	private var numFaces:Int;

	public function new() 
	{
		numFaces = 0;
		
		normals = new Vector<Float>();
		indices = new Vector<Int>();
	}
	
	public inline function getCollisionTime(vertices:Vector<Float>, numSides:Int, radius:Float, displ:Vector3D, src:XYZ, dest:XYZ, collisionPoint:Vector3D, collisionPlane:Vector3D, collisionNormal:Vector3D, minTime:Float=1):Float {

		var displacementLength:Float = displ.length;
			var t:Float;

			// Loop triangles
			var indicesLength:Int = numFaces * numSides;
			var j:Int = 0;
			var i:Int = 0;
			while (i < indicesLength) {
				// Points
				var index:Int = indices[i]*numSides; i++;
				var ax:Float = vertices[index]; index++;
				var ay:Float = vertices[index]; index++;
				var az:Float = vertices[index];
				index = indices[i]*numSides; i++;
				var bx:Float = vertices[index]; index++;
				var by:Float = vertices[index]; index++;
				var bz:Float = vertices[index];
				index = indices[i]*numSides; i++;
				var cx:Float = vertices[index]; index++;
				var cy:Float = vertices[index]; index++;
				var cz:Float = vertices[index];
				// Normal
				var normalX:Float = normals[j]; j++;
				var normalY:Float = normals[j]; j++;
				var normalZ:Float = normals[j]; j++;
				var offset:Float = normals[j]; j++;
				var distance:Float = src.x*normalX + src.y*normalY + src.z*normalZ - offset;
				// The intersection of plane and sphere
				var pointX:Float;
				var pointY:Float;
				var pointZ:Float;
				if (distance < radius) {
					pointX = src.x - normalX*distance;
					pointY = src.y - normalY*distance;
					pointZ = src.z - normalZ*distance;
				} else {
					var t:Float = (distance - radius)/(distance - dest.x*normalX - dest.y*normalY - dest.z*normalZ + offset);
					pointX = src.x + displ.x*t - normalX*radius;
					pointY = src.y + displ.y*t - normalY*radius;
					pointZ = src.z + displ.z*t - normalZ*radius;
				}
				// Closest polygon vertex
				var faceX:Float = 0;
				var faceY:Float = 0;
				var faceZ:Float = 0;
				
				var min:Float = 1e+22;
				// Loop edges
				var inside:Bool = true;
				for (k in 0...3) {
					var p1x:Float;
					var p1y:Float;
					var p1z:Float;
					var p2x:Float;
					var p2y:Float;
					var p2z:Float;
					if (k == 0) {
						p1x = ax;
						p1y = ay;
						p1z = az;
						p2x = bx;
						p2y = by;
						p2z = bz;
					} else if (k == 1) {
						p1x = bx;
						p1y = by;
						p1z = bz;
						p2x = cx;
						p2y = cy;
						p2z = cz;
					} else {
						p1x = cx;
						p1y = cy;
						p1z = cz;
						p2x = ax;
						p2y = ay;
						p2z = az;
					}
					var abx:Float = p2x - p1x;
					var aby:Float = p2y - p1y;
					var abz:Float = p2z - p1z;
					var acx:Float = pointX - p1x;
					var acy:Float = pointY - p1y;
					var acz:Float = pointZ - p1z;
					var crx:Float = acz*aby - acy*abz;
					var cry:Float = acx*abz - acz*abx;
					var crz:Float = acy*abx - acx*aby;
					// Case of the point is outside of the polygon
					if (crx*normalX + cry*normalY + crz*normalZ < 0) {
						var edgeLength:Float = abx*abx + aby*aby + abz*abz;
						var edgeDistanceSqr:Float = (crx*crx + cry*cry + crz*crz)/edgeLength;
						if (edgeDistanceSqr < min) {
							// Edge normalization
							edgeLength = Math.sqrt(edgeLength);
							abx /= edgeLength;
							aby /= edgeLength;
							abz /= edgeLength;
							// Distance to intersecion of normal along theedge
							t = abx*acx + aby*acy + abz*acz;
							var acLen:Float;
							if (t < 0) {
								// Closest point is the first one
								acLen = acx*acx + acy*acy + acz*acz;
								if (acLen < min) {
									min = acLen;
									faceX = p1x;
									faceY = p1y;
									faceZ = p1z;
								}
							} else if (t > edgeLength) {
								// Closest point is the second one
								acx = pointX - p2x;
								acy = pointY - p2y;
								acz = pointZ - p2z;
								acLen = acx*acx + acy*acy + acz*acz;
								if (acLen < min) {
									min = acLen;
									faceX = p2x;
									faceY = p2y;
									faceZ = p2z;
								}
							} else {
								// Closest point is on edge
								min = edgeDistanceSqr;
								faceX = p1x + abx*t;
								faceY = p1y + aby*t;
								faceZ = p1z + abz*t;
							}
							
						}
						inside = false;
					}
				}
				// Case of point is inside polygon
				if (inside) {
					faceX = pointX;
					faceY = pointY;
					faceZ = pointZ;
				}
				// Vector pointed from closest point to the center of sphere
				var deltaX:Float = src.x - faceX;
				var deltaY:Float = src.y - faceY; 
				var deltaZ:Float = src.z - faceZ;
				// If movement directed to point
				if (deltaX*displ.x + deltaY*displ.y + deltaZ*displ.z <= 0) {
					// reversed vector
					var backX:Float = -displ.x/displacementLength;
					var backY:Float = -displ.y/displacementLength;
					var backZ:Float = -displ.z/displacementLength;
					// Length of Vector pointed from closest point to the center of sphere
					var deltaLength:Float = deltaX*deltaX + deltaY*deltaY + deltaZ*deltaZ;
					// Projection Vector pointed from closest point to the center of sphere  on reversed vector
					var projectionLength:Float = deltaX*backX + deltaY*backY + deltaZ*backZ;
					var projectionInsideLength:Float = radius*radius - deltaLength + projectionLength*projectionLength;
					if (projectionInsideLength > 0) {
						// Time of the intersection
						var time:Float = (projectionLength - Math.sqrt(projectionInsideLength))/displacementLength;
						// Collision with closest point occurs
						if (time < minTime) {
							minTime = time;
							collisionPoint.x = faceX;
							collisionPoint.y = faceY;
							collisionPoint.z = faceZ;
							if (inside) {
								collisionPlane.x = normalX;
								collisionPlane.y = normalY;
								collisionPlane.z = normalZ;
								collisionPlane.w = offset;
							} else {
								deltaLength = Math.sqrt(deltaLength);
								collisionPlane.x = deltaX/deltaLength;
								collisionPlane.y = deltaY/deltaLength;
								collisionPlane.z = deltaZ/deltaLength;
								collisionPlane.w = collisionPoint.x*collisionPlane.x + collisionPoint.y*collisionPlane.y + collisionPoint.z*collisionPlane.z;
							}
						}
					}
				}
			}
			return minTime;
			//return minTime < 1;
	}
	
}